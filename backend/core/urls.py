from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, ProfileViewSet, TitViewSet, CommentViewSet

router = DefaultRouter()
router.register(r"profiles", ProfileViewSet, basename="profile")
router.register(r"tits", TitViewSet, basename="tit")
router.register(r"comments", CommentViewSet, basename="comment")

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("", include(router.urls)),
]
