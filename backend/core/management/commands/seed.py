from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import Profile, Tit


class Command(BaseCommand):
    help = "Popula o banco de dados com o perfil oficial do True Admin e Tits iniciais"

    def handle(self, *args, **kwargs):
        self.stdout.write("Semeando o banco de dados do True is Tough...")

        ### O poder da criação para o usuário oficial do "True Admin"
        admin_user, created = User.objects.get_or_create(
            username="codefather",
            defaults={
                "email": "codefather@trueistough.com",
                "is_staff": True,
                "is_superuser": True,
            },
        )

        if created:
            admin_user.set_password("Lds1436606")
            admin_user.save()
            self.stdout.write(
                self.style.SUCCESS(
                    "Usuário @codefather criado com sucesso! (Senha: Lds1436606)"
                )
            )

        ### configuração do meu perfil
        profile, _ = Profile.objects.get_or_create(user=admin_user)
        profile.display_name = "True Admin - The Codefather"
        profile.bio = (
            "A verdade é dura, mas o código é limpo. Bem-vindo ao True is Tough!"
        )
        profile.save()

        ### Tits do Codefather, cheers!!
        initial_tits = [
            "Primeiro vai o arroz e depois o feijão por cima! Quem coloca o feijão por baixo nem é gente.",
            "Schrödinger inventou o Git sem saber: o seu código está funcionando e bugado ao mesmo tempo até você rodar o build em produção.",
            "O nome é bolacha! Biscoito é o que o seu cachorro come.",
            "Cloud é só um monte de servidores Linux no computador dos outros.",
            "Só se preocupa com prazo de entrega quem não se garante na pressão.",
            "Só faz backup quem não se garante na porrada!",
            "Rollback: 1. Ato de desfazer algo que parecia uma boa ideia na teoria; 2. Voltar no tempo e fingir que nada aconteceu; 3. Apertar o botão de pânico com elegância.",
            "Palmeiras não tem mundial!",
            "Existem 10 tipos de pessoas no mundo: as que entendem binário e as que não entendem.",
            "Café: a substância mágica que transforma 'não sei como resolver isso' em 'ahh, faltava um ponto e vírgula'.",
            "Na minha máquina funciona não é justificativa, a não ser que a gente vá entregar a sua máquina pro cliente.",
            "Linux, one system to rule them all",
            "Dark mode, please. Light mode attracts bugs!",
            "Ada Lovelace: The Mother of All. Respeite quem inventou a lógica de programação!",
        ]

        ### regra para criar os tits no banco de dados caso eles ainda não existam.
        for content in initial_tits:
            Tit.objects.get_or_create(author=admin_user, content=content)

        self.stdout.write(
            self.style.SUCCESS(
                "Seed executado com sucesso! O True Admin já está pronto para mitar."
            )
        )
