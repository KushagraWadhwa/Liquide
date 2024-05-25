import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

interface TabsStructure {
  id: number;
  name: string;
  data: Array<number>;
}
function App(): React.JSX.Element {
  const tab1 = [8, 11, 16, 25, 31, 37, 44, 48];
  const tab2 = [8, 11, 16, 25, 31, 37, 28, 21];
  const tab3 = [8, 11, 16, 25, 20, 18, 11, 8];
  const tabs = [
    {
      id: 1,
      name: 'Tab 1',
      data: tab1,
    },
    {
      id: 2,
      name: 'Tab2',
      data: tab2,
    },
    {
      id: 3,
      name: 'Tab3',
      data: tab3,
    },
  ];
  const [commonElements, setCommonElements] = useState<Array<number>>([
    1, 2, 3, 4, 5,
  ]);
  const [selectedTab, setSelectedTab] = useState(1);
  const [increasing, setIncreasing] = useState(true);

  const filterOutArray = () => {
    let filteredArray = [];
    let a1 = 0,
      a2 = 0,
      a3 = 0;

    while (a1 < tab1.length && a2 < tab2.length && a3 < tab3.length) {
      if (tab1[a1] === tab2[a2] && tab2[a2] === tab3[a3]) {
        filteredArray.push(tab1[a1]);
        a1++;
        a2++;
        a3++;
      } else {
        break;
      }
    }

    setCommonElements(filteredArray);
  };

  useEffect(() => {
    filterOutArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIncreasing = (arr: Array<number>, n: number) => {
    // If the first two and the last two elements
    // of the array are in increasing order
    if (arr[0] <= arr[1] && arr[n - 2] <= arr[n - 1]) {
      return true;
    }
    // If the first two and the last two elements
    // of the array are in decreasing order
    else {
      return false;
    }
  };

  const callIncreasing = () => {
    const data =
      selectedTab === 1
        ? tab1.slice(commonElements.length - 1)
        : selectedTab === 2
        ? tab2.slice(commonElements.length - 1)
        : tab3.slice(commonElements.length - 1);

    setIncreasing(checkIncreasing(data, data.length));
  };

  useEffect(() => {
    callIncreasing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  return (
    <SafeAreaView style={Styles.mainView}>
      <ScrollView contentContainerStyle={Styles.mainScrollView}>
        <View style={Styles.blackBoxView}>
          <ScrollView
            horizontal
            style={Styles.heightMainScroll}
            contentContainerStyle={Styles.horizontalScroll}>
            {tabs.map((item: TabsStructure, index: number) => {
              return (
                <TouchableOpacity
                  style={[
                    Styles.tabView,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      backgroundColor:
                        item?.id === selectedTab ? '#3b3b3b' : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    setSelectedTab(item?.id);
                  }}
                  key={index}>
                  <Text
                    style={[
                      Styles.nameText,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        color: item?.id !== selectedTab ? 'gray' : 'white',
                      },
                    ]}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={Styles.chartView}>
            <LineChart
              withOuterLines={false}
              withInnerLines={false}
              bezier
              fromZero
              data={{
                datasets: [
                  {
                    data: commonElements,
                  },
                ],
              }}
              width={Dimensions.get('window').width / 2.5}
              height={170}
              yAxisInterval={1}
              chartConfig={{
                color: () => 'rgba(255, 255, 255,1)',
              }}
              xLabelsOffset={90}
              withDots={false}
              transparent
              withHorizontalLines={false}
              withVerticalLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              withShadow={false}
            />
            <View style={Styles.lineView} />
            <LineChart
              bezier
              fromZero
              data={{
                datasets: [
                  {
                    data:
                      selectedTab === 1
                        ? tab1.slice(commonElements.length - 1)
                        : selectedTab === 2
                        ? tab2.slice(commonElements.length - 1)
                        : tab3.slice(commonElements.length - 1),
                  },
                ],
              }}
              width={Dimensions.get('window').width / 2.5}
              height={170}
              yAxisInterval={1}
              chartConfig={{
                color: () =>
                  increasing ? 'rgba(154, 205, 50,1)' : 'rgba(255, 0, 0,1)',
              }}
              withDots={false}
              withHorizontalLines={false}
              withVerticalLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              withShadow={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainScrollView: {flexGrow: 1, justifyContent: 'center'},
  blackBoxView: {
    backgroundColor: 'black',
    marginHorizontal: 15,
    borderRadius: 15,
  },
  horizontalScroll: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  tabView: {
    marginVertical: 15,
    paddingHorizontal: Dimensions.get('screen').width / 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  nameText: {
    fontWeight: 'bold',
  },
  heightMainScroll: {
    marginTop: Dimensions.get('window').height / 10,
    marginBottom: Dimensions.get('window').height / 18,
  },
  chartView: {flexDirection: 'row', justifyContent: 'center'},
  lineView: {height: 140, width: 1, backgroundColor: '#3b3b3b'},
});

export default App;
