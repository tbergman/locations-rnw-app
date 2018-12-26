
import React from 'react';
import {
  View,
} from 'react-native';

import { MdChevronRight, MdAdd, MdModeEdit, MdDelete, MdKeyboardArrowRight, MdCheck, MdList } from "react-icons/md";


export class DropdownArrow extends React.Component {
  setNativeProps(nativeProps) {
    this._arrowBtn.setNativeProps(nativeProps)
  }

  render() {
    return (
      <View ref={component => this._arrowBtn = component}>
        <MdChevronRight size={22}/>
      </View>
    )
  }
}

export class ArrowRight extends React.Component {
  setNativeProps(nativeProps) {
    this._arrowRightBtn.setNativeProps(nativeProps)
  }

  render() {
    return (
      <View ref={component => this._arrowRightBtn = component}>
        <MdKeyboardArrowRight size={30}
        // color="#b8c3c9"
        style={{color: this.props.map ? 'red' : '#b8c3c9'}}
      />
      </View>
    )
  }
}

export class CheckButton extends React.Component {
  setNativeProps(nativeProps) {
    this._checkBtn.setNativeProps(nativeProps)
  }

  render() {
    return (
      <View ref={component => this._checkBtn = component}>
        <MdCheck size={30} color="green"/>
      </View>
    )
  }
}

export class ListIcon extends React.Component {
  setNativeProps(nativeProps) {
    this._listIcon.setNativeProps(nativeProps)
  }

  render() {
    return (
      <View ref={component => this._listIcon = component}>
        <MdList size={16}/>
      </View>
    )
  }
}


export class AddButton extends React.Component {
  setNativeProps(nativeProps) {
    this._addBtn.setNativeProps(nativeProps)
  }

  render() {
    return (
      <View ref={component => this._addBtn = component}>
        <MdAdd size={22}/>
      </View>
    )
  }
}

export class AddLocation extends React.Component {
  setNativeProps(nativeProps) {
    this._addBtn.setNativeProps(nativeProps)
  }

  render() {
    return (
      <View ref={component => this._addBtn = component}>
        <MdAdd size={22}/>
      </View>
    )
  }
}

export class EditButton extends React.PureComponent {

  setNativeProps(nativeProps) {
    this._editBtn.setNativeProps(nativeProps)
  }
  render() {
    return (
      <View ref={component => this._editBtn = component}>
        <MdModeEdit
          size={22}
          style={{color: this.props.disabled ? 'gray' : 'red'}}
        />
      </View>
    )
  }
}

export class DeleteButton extends React.Component {
  setNativeProps(nativeProps) {
    this._deleteBtn.setNativeProps(nativeProps)
  }
  render() {
    return (
      <View ref={component => this._deleteBtn = component}>
        <MdDelete size={22} style={{color: this.props.disabled ? 'gray' : 'red'}}/>
      </View>
    )
  }
}

