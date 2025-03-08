
# docker build -f benchmark/Dockerfile -t roo-code-benchmark .

FROM debian:bullseye-slim

RUN apt-get update && \
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    --no-install-recommendsRUN curl -sSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor  | apt-key add -                                                                                          RUN echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable ma                                                                                                             in" > /etc/apt/sources.list.d/vscode.listRUN apt-get update && apt-get -y install \
    code git \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libexpat1 \
    libfontconfig1 \
    libfreetype6 \
    libgtk2.0-0 \
    libpango-1.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    libxshmfence-dev\
    openssh-client \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

CMD [ "/usr/bin/code", "--verbose" ]

# FROM buildpack-deps:jammy

# # Install Python 3.11
# RUN apt-get update && apt-get install -y \
#     software-properties-common \
#     cmake \
#     libboost-all-dev \
#     && add-apt-repository ppa:deadsnakes/ppa \
#     && apt-get update \
#     && apt-get install -y \
#     python3.11 \
#     python3.11-venv \
#     python3.11-dev \
#     python3-pip \
#     ca-certificates-java \
#     openjdk-21-jdk \
#     libtbb-dev \
#     && rm -rf /var/lib/apt/lists/*

# # Make python3.11 the default python3
# RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1

# # Install Go with architecture detection
# RUN ARCH=$(uname -m) && \
#     if [ "$ARCH" = "x86_64" ]; then \
#         GOARCH="amd64"; \
#     elif [ "$ARCH" = "aarch64" ]; then \
#         GOARCH="arm64"; \
#     else \
#         false; \
#     fi && \
#     curl -L "https://golang.org/dl/go1.21.5.linux-$GOARCH.tar.gz" -o go.tar.gz && \
#     tar -C /usr/local -xzf go.tar.gz && \
#     rm go.tar.gz
# ENV PATH="/usr/local/go/bin:${PATH}"

# # Install Rust
# ADD https://sh.rustup.rs /tmp/rustup.sh
# RUN chmod +x /tmp/rustup.sh && /tmp/rustup.sh -y && rm /tmp/rustup.sh
# ENV PATH="/root/.cargo/bin:${PATH}"

# # Install Node.js and dependencies
# RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
#     apt-get install -y nodejs && \
#     rm -rf /var/lib/apt/lists/* && \
#     mkdir -p /npm-install && \
#     cd /npm-install && \
#     npm init -y && \
#     npm install \
#     jest \
#     @babel/core@7.25.2 \
#     @exercism/babel-preset-javascript@0.2.1 \
#     @exercism/eslint-config-javascript@0.6.0 \
#     @types/jest@29.5.12 \
#     @types/node@20.12.12 \
#     babel-jest@29.6.4 \
#     core-js@3.37.1 \
#     eslint@8.49.0

# COPY . /aider
# RUN pip3 install --no-cache-dir --upgrade pip uv
# RUN uv pip install --system --no-cache-dir -e /aider[dev]
# RUN git config --global --add safe.directory /aider
# WORKDIR /aider
