import mxgraph from './index'
import _ from 'lodash'
import xCell from './XCell'

const {
  mxEvent,
  mxUtils,
  mxCell,
  mxCellOverlay
} = mxgraph

Object.assign(mxEvent, {
  EDGE_START_MOVE: 'edgeStartMove',
  VERTEX_START_MOVE: 'vertexStartMove'
})

// export class PokeElement {
//   constructor(element) {
//     this.id = pokeElementIdSeed;
//     pokeElementIdSeed++;
//     this.element = element;
//     this.normalType = '';
//   }
// }

export class XCell extends mxCell {
  constructor(graph,mxCell) {
    
    this.graph=graph
    this.mxCell=mxCell

    //super(container)
    this._init()
  }

  _init() {

    // this._configCoder();
  }
///增加遮罩
  addOverlay(state) {
    const _createOverlay = (image, tooltip) => {
      const overlay = new mxCellOverlay(image, tooltip)
      overlay.addListener(mxEvent.CLICK, (_sender, _evt) => {
        mxUtils.alert(`${tooltip}\nLast update: ${new Date()}`)
      })
      return overlay
    }
    this.graph.addCellOverlay(this.mxcell, _createOverlay(this.graph.warningImage, `State: ${state}`))
    return this
  }
//移除遮罩
  async removeOverlay() {
    this.graph.removeCellOverlays(this.mxcell)
    return this
  }

  addOverlay1(cell, state) {
    const _createOverlay = (image, tooltip) => {
      const overlay = new mxCellOverlay(image, tooltip)
      overlay.addListener(mxEvent.CLICK, (_sender, _evt) => {
        mxUtils.alert(`${tooltip}\nLast update: ${new Date()}`)
      })
      return overlay
    }
    this.addCellOverlay(cell, _createOverlay(this.warningImage, `State: ${state}`))
    return this
  }
}

let cell = {}
//销毁cell
export const destroyCell = () => {
  cell.destroy()
  cell = {}
}
//创建 cell
export const genCell = (container) => {
  cell = new XCell(container)

  return cell
}

export const getCell = () => cell
