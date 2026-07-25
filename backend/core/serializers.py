from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Tit, Like, Comment


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "username",
            "display_name",
            "bio",
            "avatar",
            "followers_count",
            "following_count",
            "created_at",
        ]

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )
        Profile.objects.create(user=user, display_name=user.username)
        return user


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Comment
        fields = ["id", "user", "tit", "content", "created_at"]
        read_only_fields = ["user", "tit"]


class TitSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.username")
    author_avatar = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Tit
        fields = [
            "id",
            "author",
            "author_avatar",
            "content",
            "likes_count",
            "comments_count",
            "is_liked",
            "created_at",
        ]

    def get_author_avatar(self, obj):
        if hasattr(obj.author, "profile") and obj.author.profile.avatar:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.author.profile.avatar.url)
            return obj.author.profile.avatar.url
        return None

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, tit=obj).exists()
        return False
