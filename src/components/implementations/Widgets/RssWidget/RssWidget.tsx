import React from 'react'
import * as rssParser from 'react-native-rss-parser';
import { View, ActivityIndicator, StyleProp, StyleSheet } from 'react-native';
import { RssItem, RssResponse } from 'src/services/Rss';
import { RssWidgetItem } from './RssWidgetItem';
import { PassedWidgetProps } from 'src/screens/Home/widgets';
import { openPlatformSpecificWebViews } from 'src/services/Browser';
import Config from 'react-native-config';

interface Props {
    style?: StyleProp<{}>

}

interface State {
    loading: boolean
    rssData: RssItem[]
}

export class RssWidget extends React.Component<Props & PassedWidgetProps, State> {

    public state: State = {
        loading: true,
        rssData: [],
    }

    public async componentDidMount() {
        const response = await fetch(Config.RSS_FEED_URL)
        const responseData = await response.text()
        const convertedResponseDataObject: RssResponse = await rssParser.parse(responseData)

        console.log(convertedResponseDataObject)


        this.setState({
            rssData: convertedResponseDataObject.items,
            loading: false,
        })
    }

    public render() {

        return (
            <View style={this.getStyles()}>
                {this.renderList()}
            </View>
        )
    }

    public renderList() {
        const { themeContext } = this.props
        const { loading, rssData } = this.state

        if (loading) {
            return <ActivityIndicator />
        }

        return rssData.map((item, index) => (
            <RssWidgetItem
                key={index}
                onPress={this.handleItemPress}
                item={item}
                theme={themeContext.theme}
            />
        ))
    }

    private handleItemPress = (item: RssItem) => {
        openPlatformSpecificWebViews(item.links[0].url)
    }

    private getStyles() {
        const { style } = this.props
        return [
            styles.container,
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
    }
})
