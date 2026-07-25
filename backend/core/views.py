from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile, Tit, Like, Comment
from .serializers import (
    ProfileSerializer,
    UserRegisterSerializer,
    TitSerializer,
    CommentSerializer,
)


### View para cadastro de usuários (pública)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]


### ViewSet do perfil de usuário
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = "user__username"

    @action(
        detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated]
    )
    def follow(self, request, user__username=None):
        target_profile = self.get_object()
        current_profile = request.user.profile

        if target_profile == current_profile:
            return Response(
                {
                    "error": "Você não pode seguir a si mesmo, a menos que esteja no metaverso!"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if current_profile.following.filter(id=target_profile.id).exists():
            current_profile.following.remove(target_profile)
            return Response(
                {"message": f"Você deixou de seguir @{target_profile.user.username}"}
            )
        else:
            current_profile.following.add(target_profile)
            return Response(
                {"message": f"Você agora está seguindo @{target_profile.user.username}"}
            )


### ViewSet dos tits (posts) e feed dinâmico
class TitViewSet(viewsets.ModelViewSet):
    serializer_class = TitSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if (
            self.request.query_params.get("feed") == "true"
            and self.request.user.is_authenticated
        ):
            following_profiles = self.request.user.profile.following.all()
            following_users = User.objects.filter(profile__in=following_profiles)

            return Tit.objects.filter(
                author__in=following_users
                | User.objects.filter(id=self.request.user.id)
            )

        return Tit.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(
        detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated]
    )
    def like(self, request, pk=None):
        tit = self.get_object()
        like_qs = Like.objects.filter(user=request.user, tit=tit)

        if like_qs.exists():
            like_qs.delete()
            return Response({"message": "Curtida removida!"}, status=status.HTTP_200_OK)
        else:
            Like.objects.create(user=request.user, tit=tit)
            return Response({"message": "Tit curtido!"}, status=status.HTTP_201_CREATED)


### ViewSet dos comentários
class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        tit_id = self.request.query_params.get("tit")
        if tit_id:
            return Comment.objects.filter(tit_id=tit_id)
        return Comment.objects.all()

    def perform_create(self, serializer):
        tit_id = self.request.data.get("tit")
        tit = Tit.objects.get(id=tit_id)
        serializer.save(user=self.request.user, tit=tit)
