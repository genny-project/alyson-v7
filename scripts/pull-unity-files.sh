cd ../public
rm -rf unity
mkdir unity
cd ../../stt-unity
git pull
cd ..
cp -R stt-unity/safeTrafficTown/Build/* alyson-v7/public/unity/
