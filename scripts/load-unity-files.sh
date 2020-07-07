cd ../public
rm -rf unity
mkdir unity
cd ../../
rm -rf stt-unity
git clone https://github.com/OutcomeLife/stt-unity.git
cp -R stt-unity/safeTrafficTown/Build/* alyson-v7/public/unity/
