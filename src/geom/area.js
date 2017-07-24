/**
 * @fileOverview 面积图
 * @author dxq613@gmail.com
 */

const GeomBase = require('./base');
const SplitMixin = require('./mixin/split');
const Util = require('../util');

class Area extends GeomBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'area';
    cfg.shapeType = 'area';
    cfg.generatePoints = true;
    cfg.sortable = true;
    return cfg;
  }

  constructor(cfg) {
    super(cfg);
    Util.assign(this, SplitMixin);
  }

  draw(data, container, shapeFactory) {
    const cfg = this.getDrawCfg(data[0]);
    const splitArray = this.splitData(data);

    cfg.origin = data; // path,line,area 等图的origin 是整个序列
    Util.each(splitArray, function(subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex; // 传入分割片段索引 用于生成id
      const points = subData.map(obj => {
        return obj.points;
      });
      cfg.points = points;
      shapeFactory.drawShape(cfg.shape, cfg, container);
    });
  }
}

module.exports = Area;