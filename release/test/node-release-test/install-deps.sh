# before running this script, on the parent project:
# * npm run build
# * npm pack


#credit: https://www.linuxquestions.org/questions/programming-9/bash-script-return-full-path-and-filename-680368/page3.html
function abspath {
    if [[ -d "$1" ]]
    then
        pushd "$1" >/dev/null
        pwd
        popd >/dev/null
    elif [[ -e $1 ]]
    then
        pushd "$(dirname "$1")" >/dev/null
        echo "$(pwd)/$(basename "$1")"
        popd >/dev/null
    else
        echo "$1" does not exist! >&2
        return 127
    fi
}

SCRIPT_PATH=$(abspath $0)
SCRIPT_DIR=$(dirname $SCRIPT_PATH)

pushd $SCRIPT_DIR/../../.. > /dev/null
PACKAGE_DIR=$(abspath $(pwd))

PACKAGE_NAME=$(ls steradian-*.tgz -1 | tail -n 1)
PACKAGE_PATH="${PACKAGE_DIR}/${PACKAGE_NAME}"
popd > /dev/null

npm ci
npm install $PACKAGE_PATH --no-save