echo "Fresh new public/unity folder"
rm -rf ../public/unity; mkdir ../public/unity
cd ../../
echo "Clone or Pull the latest stt-unity"
git clone https://github.com/OutcomeLife/stt-unity.git || (cd stt-unity; git pull)
echo "Copy build files from stt-unity to alyson-v7"
cp -R stt-unity/safeTrafficTown/Build/* alyson-v7/public/unity/
