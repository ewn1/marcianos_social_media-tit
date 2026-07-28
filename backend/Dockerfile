### imagem do python
FROM python:3.12-slim

### variáveis de ambiente
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_NO_INTERACTION=1 \
    PATH="$POETRY_HOME/bin:$PATH"

### Instala ass dependências do sistema necessárias para compilar os pacotes.
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

### Instala o poetry oficialmente no diretório definido em POETRY_HOME
RUN curl -sSL https://install.python-poetry.org | python3 - --version 2.1.1 || curl -sSL https://install.python-poetry.org | python3 -

### Define o diretório de trabalho dentro do container
WORKDIR /app

### Copia os arquivos de gerência de dependências
COPY pyproject.toml poetry.lock ./

### Configura o poetry e instala as dependências em modo sem ambiente virtual próprio
RUN /opt/poetry/bin/poetry config virtualenvs.create false \
    && /opt/poetry/bin/poetry install --no-root --without dev

#### Copia o restante do código do backend para dentro do container
COPY . .

### porta do Django
EXPOSE 8000

### Comando para rodar a aplicação conectado na nuvem
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]