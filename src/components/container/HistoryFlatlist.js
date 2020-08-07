import React, { Component } from 'react'
import { View } from 'react-native'
import HistoryItem from '../presentation/HistoryItem'
import {FlatList} from 'react-native'

export default class HistoryFlatlist extends Component {

  
    _renderItem = ({item, index}) => (
      <HistoryItem
        id={index}
        item={item}
        length={this.props.data.length}
      />
    )
  
    render() {
      return (
        <FlatList
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          showsVerticalScrollIndicator={false}
          refreshing={this.props.isRefreshing}
          onRefresh={() => this.props.onRefresh()}
        />
      )
    }
  }