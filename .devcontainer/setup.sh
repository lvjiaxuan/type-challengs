corepack enable pnpm
export PNPM_HOME="/home/node/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
pnpm i
pnpm i @antfu/ni -g
chmod 777 .husky/*