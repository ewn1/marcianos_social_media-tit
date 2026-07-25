from django.db import models
from django.contrib.auth.models import User


### Perfil do Usuário
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    display_name = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(max_length=280, blank=True, default="")
    avatar = models.ImageField(
        upload_to="avatars/", default="avatars/default.png", blank=True, null=True
    )

    following = models.ManyToManyField(
        "self", symmetrical=False, related_name="followers", blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"@{self.user.username}"


### Tit é o "Post" do True is Tough!
class Tit(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tits")
    content = models.TextField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.author.username}: {self.content[:30]}..."


### Curtidas no Tit
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    tit = models.ForeignKey(Tit, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "tit")

    def __str__(self):
        return f"{self.user.username} curtiu o tit {self.tit.id}"


### Comentários no Tit
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    tit = models.ForeignKey(Tit, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.user.username} comentou no tit {self.tit.id}"
