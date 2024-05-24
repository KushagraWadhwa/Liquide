/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
  const [commonElements, setCommonElements] = useState<Array<number>>([]);
  const [selectedTab, setSelectedTab] = useState(1);

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

  return (
    <SafeAreaView style={Styles.mainView}>
      <ScrollView contentContainerStyle={Styles.mainScrollView}>
        <View style={Styles.blackBoxView}>
          <ScrollView
            horizontal
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
});

export default App;
