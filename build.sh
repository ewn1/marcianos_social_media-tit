set -o errexit

# Instala o Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Adiciona o poetry ao PATH do sistema
export PATH="$HOME/.local/bin:$PATH"

cd backend

# Instala as dependências do projeto
poetry install --no-root

# Roda as migrações no NeonDB
poetry run python manage.py migrate

# Coleta arquivos estáticos
poetry run python manage.py collectstatic --no-input