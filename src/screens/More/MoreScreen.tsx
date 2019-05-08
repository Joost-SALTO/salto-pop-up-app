import * as React from 'react'
import { View, StyleSheet, StyleProp, Text, FlatList, TouchableHighlight, Image, Dimensions } from 'react-native'
import { getIcon } from 'src/utils/icons';
import { NavigationScreenProps } from 'react-navigation';
import { Title } from 'src/components/core/Navigation/NavigationIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import { withThemeContext, ThemeInjectedProps } from 'src/providers/ThemeProvider';

interface Props extends NavigationScreenProps<{}> {
    style: StyleProp<{}>
}

interface State {

}

interface MoreItem {
    screen: string
    label: string
    icon: string
}

const moreItems: MoreItem[] = [
    { screen: 'Settings', label: 'Instellingen', icon: getIcon('settings') },
    { screen: 'Events', label: 'Andere evenementen', icon: getIcon('megaphone') },
]

export const MoreScreen = withThemeContext(
    class MoreScreen extends React.Component<Props & ThemeInjectedProps, State> {

        public render() {
            return (
                <View style={this.getStyles()}>
                    <StatusBar hidden={false} animated={false} />
                    <Image
                        style={styles.background}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT64sLpyaGTic1h0Vu8qMSBA6BNXyR6zxqd4xh-4FUcl99kt4hk' }}
                    />
                    <Image style={styles.logo} source={require("../../../../src/assets/images/logos/salto.png")} />
                    <FlatList<MoreItem>
                        ListHeaderComponent={() => (
                            <View style={styles.titleContainer}>
                                <Title>Meer</Title>
                            </View>
                        )}
                        contentContainerStyle={this.getWrapperStyles()}
                        contentInset={{ top: 100 }}
                        contentOffset={{ x: 0, y: -100 }}
                        data={moreItems}
                        renderItem={item => this.renderItem(item.item)}
                        keyExtractor={item => item.label}
                    />
                </View>
            )
        }

        private renderItem(item: MoreItem) {
            return (
                <TouchableHighlight onPress={() => this.onItemPress(item)}>
                    <View style={styles.itemContainer}>
                        <Icon
                            name={item.icon}
                            color={'#000'}
                            size={25}
                        />
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>
                                {item.label}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }

        private onItemPress = (item: MoreItem) => {
            const { navigation } = this.props

            navigation.navigate(item.screen)
        }

        private getWrapperStyles() {
            const { PageBackgroundColor } = this.props.themeContext.theme
            return [
                { backgroundColor: PageBackgroundColor },
                styles.content,
            ]
        }

        private getStyles() {
            const { style } = this.props
            return [
                styles.container,
                style,
            ]
        }
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        height: 44,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    labelContainer: {
        height: 44,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        marginLeft: 12,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '50%',
    },
    logo: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    content: {
        minHeight: Dimensions.get('screen').height,
        paddingHorizontal: 22,
        borderRadius: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
    },
})
