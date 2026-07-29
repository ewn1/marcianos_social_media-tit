#!/usr/bin/env bash
set -o errexit

# Define um diretório com permissão de escrita para o Poetry no Render
export POETRY_HOME="/opt/render/project/.local"
export PATH="$POETRY_HOME/bin:$PATH"

# Instala o Poetry de forma limpa no diretório permitido
curl -sSL https://install.python-poetry.org | python3 -

# Instala as dependências do projeto
poetry install --no-root

# Executa as migrações do banco de dados
poetry run python manage.py migrate

# Coleta os arquivos estáticos para a produção
poetry run python manage.py collectstatic --no-input