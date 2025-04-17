FROM node:20-bullseye

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Install global npm packages
RUN npm install -g npm@latest

# Set up non-root user (optional, but recommended)
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Make sure the user exists
RUN if [ "$USERNAME" != "node" ]; then \
        groupadd --gid $USER_GID $USERNAME \
        && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME; \
    fi

# Set the default user
USER $USERNAME

# The ENTRYPOINT allows the container to run as an executable
ENTRYPOINT [ "/bin/bash", "-c" ]