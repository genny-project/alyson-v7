echo "begin fetching unity project files..."
cd ..
echo "deleting unity_temp directory..."
rm -rf unity_temp
echo "creating unity_temp directory..."
mkdir "unity_temp"
echo "cloning unison project..."
git clone https://github.com/OutcomeLife/stt-unity.git unity_temp
# git clone https://github.com/OutcomeLife/$1.git unity_temp
cd unity_temp
echo "initialising git lfs..."
git lfs install
echo "resetting unison project..."
git reset --hard origin/master
echo "pulling unison project..."
git pull
cd ../alyson-v7/public
echo "deleting unity directory in alyson-v7/public..."
rm -rf unity
echo "creating unity directory..."
mkdir "unity"
cd ../..
echo "copying unity data to alyson-v7/public/unity..."
cp -R unity_temp/safeTrafficTown/Build/* alyson-v7/public/unity/
# cp -R unity_temp/Build/* alyson-v7/public/unity/
echo "deleting unity_temp directory..."
rm -rf unity_temp
echo "process complete."