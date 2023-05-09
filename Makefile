MAKELIB=.makelib
BUILD_DIR?=build

APP_NAME=pcd

TARGET_ENV?=develop

# deploy
# Note: Do not modify these variables here, include it in ./env/<target_env>/.env
STAGING_SERVER=blackbox
STAGING_DOMAIN=app.dn01-tecq.gotecq.net
STAGING_TARGET_DEPLOY=${STAGING_DOMAIN}${REACT_APP_BASE_URL}

DEVELOP_SERVER?=host01
DEVELOP_DOMAIN?=app-dev.dn01-tecq.gotecq.net
DEVELOP_TARGET_DEPLOY?=${DEVELOP_DOMAIN}${REACT_APP_BASE_URL}

include ${MAKELIB}/reactjs.mk
