#! bash -eu

npm pack
npm run buildTestSuite

mkdir -p release/test/node-release-test/tests
cp dist/StrontiumTestSuite.js release/test/node-release-test/tests

pushd release/test/node-release-test

./run.sh

popd