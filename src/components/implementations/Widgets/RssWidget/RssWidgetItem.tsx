import React from 'react'
import { View, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';
import { RssItem } from 'src/services/Rss';
import { Title } from 'src/components/core/Typography/Title';
import { ThemeType } from 'src/services/theme';
import { Paragraph } from 'src/components/core/Typography/Paragraph';
import { SubTitle } from 'src/components/core/Typography/SubTitle';
import format = require('date-fns/format');

interface Props {
    style?: StyleProp<{}>
    item: RssItem
    theme: ThemeType
    onPress?: (item: RssItem) => void
}

export class RssWidgetItem extends React.Component<Props, {}> {
    public render() {
        const { item, theme } = this.props

        return (
            <TouchableOpacity onPress={this.handleOnPress}>
                <View style={this.getStyles()}>
                    <Title numberOfLines={2} color={theme.colors.TitleColor}>
                        {item.title}
                    </Title>
                    <Paragraph numberOfLines={2} color={theme.colors.TitleColor}>
                        {item.description}
                    </Paragraph>
                    <SubTitle numberOfLines={2} color={theme.colors.TitleColor}>
                        {format(item.published, 'H:m DD-MM-YYYY')}
                    </SubTitle>
                </View>
            </TouchableOpacity>

        )
    }

    private handleOnPress = () => {
        const { onPress, item } = this.props

        if (onPress) {
            onPress(item)
        }
    }

    private getStyles() {
        const { style, theme } = this.props
        return [
            styles.container,
            { borderBottomColor: theme.colors.SeperatorColor },
            style,
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})