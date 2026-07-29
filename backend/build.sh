set -o errexit

curl -sSL https://install.python-poetry.org | python3 -
export PATH="$HOME/.local/bin:$PATH"

poetry install --no-root
poetry run python manage.py migrate
poetry run python manage.py collectstatic --no-input