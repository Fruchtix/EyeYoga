import React, { Component } from 'react'
import ExerciseItem from '../presentation/ExerciseItem'
import {FlatList} from 'react-native'

export default class ExcerciseFlatlist extends Component {
  
    _onPressItem = (name,id) => {
        this.props.onPress(name,id)
      }
  
    _renderItem = ({item, index}) => (
      <ExerciseItem
        id={index.toString()}
        onPressItem={this._onPressItem}
        item={item}
        done={this.props.doneCount}
        free={item.free}
        navigation={this.props.navigation}
        premium={this.props.premium}
        course={this.props.course}
      />
    )
  
    render() {
      return (
        <FlatList
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          refreshing={this.props.isRefreshing}
          onRefresh={() => this.props.onRefresh()}
          showsVerticalScrollIndicator={false}
        />
      )
    }
  }