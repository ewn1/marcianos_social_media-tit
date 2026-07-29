from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
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
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    lookup_field = "user__username"

    def get_queryset(self):
        queryset = Profile.objects.all()
        search_query = self.request.query_params.get("search", None)

        if search_query:
            # Lógica para buscar o usuário pelo username ou display_name
            queryset = queryset.filter(
                user__username__icontains=search_query
            ) | queryset.filter(display_name__icontains=search_query)

        return queryset.distinct()

    ### Action para retornar o perfil do usuário atualmente autenticado
    @action(
        detail=False,
        methods=["get"],
        permission_classes=[permissions.IsAuthenticated],
    )
    def me(self, request):
        profile = request.user.profile
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

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
                {
                    "message": f"Você deixou de seguir @{target_profile.user.username}",
                    "is_following": False,
                },
                status=status.HTTP_200_OK,
            )
        else:
            current_profile.following.add(target_profile)
            return Response(
                {
                    "message": f"Você agora está seguindo @{target_profile.user.username}",
                    "is_following": True,
                },
                status=status.HTTP_200_OK,
            )

    ### Action para o react poder fazer a requisição e renderizar a lista de seguidos e seguidores
    @action(
        detail=True,
        methods=["get"],
        permission_classes=[permissions.IsAuthenticatedOrReadOnly],
    )
    def followers(self, request, user__username=None):
        profile = self.get_object()
        # Busca perfis que possuem este profile dentro do seu 'following'
        followers_qs = Profile.objects.filter(following=profile)
        serializer = self.get_serializer(
            followers_qs, many=True, context={"request": request}
        )
        return Response(serializer.data)

    @action(
        detail=True,
        methods=["get"],
        permission_classes=[permissions.IsAuthenticatedOrReadOnly],
    )
    def following(self, request, user__username=None):
        profile = self.get_object()
        following_qs = profile.following.all()
        serializer = self.get_serializer(
            following_qs, many=True, context={"request": request}
        )
        return Response(serializer.data)


### ViewSet dos tits com feed dinâmico
class TitViewSet(viewsets.ModelViewSet):
    serializer_class = TitSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Lógica para mostrar somente os Tits de quem o usuário segue
        if (
            self.request.query_params.get("feed") == "true"
            and self.request.user.is_authenticated
        ):
            following_profiles = self.request.user.profile.following.all()
            following_users = User.objects.filter(profile__in=following_profiles)

            return Tit.objects.filter(author__in=following_users)

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


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not old_password or not new_password:
            return Response(
                {"error": "Informe a senha atual e a nova senha."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.check_password(old_password):
            return Response(
                {"error": "A senha atual está incorreta."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        return Response(
            {"message": "Senha alterada com sucesso!"},
            status=status.HTTP_200_OK,
        )
