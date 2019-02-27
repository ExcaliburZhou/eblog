function createElement(type, preProps, ...children) {
  const props = { ...preProps };
  props.children = []
    .concat(...children)
    .filter(child => child != null && child !== false)
    .map(child => child instanceof Object ? child : createTextElement(child));
  return { type, props };
}

let rootInstance = null;

function render(element, dom) {
  rootInstance = reconcile(dom, rootInstance, element);
}

const TEXT_ELEMENT = 'TEXT_ELEMENT';
function instantiate(element) {
  const { type, props = {} } = element;
  const { children = [] } = props;
  const isDom = typeof type === 'string';
  const isClass = !!(type.prototype && type.prototype.isReactComponent);
  if (isDom) {
    const isText = type === TEXT_ELEMENT;
    const dom = isText ? document.createTextNode('') : document.createElement(type);
    updateDomProperties(dom, [], props);

    const childInstance = children.map(instantiate);
    const childDoms = childInstance.map(child => child.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));
    return {
      element,
      dom,
      childInstance
    };
  } else if (isClass) {
    const instance = {};
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    Object.assign(instance, {
      dom: childInstance.dom,
      element,
      childInstance,
      publicInstance,
    });
    return instance;
  } else {

    const childElement = type(props);
    const childInstance = instantiate(childElement);
    return {
      dom: childInstance.dom,
      element,
      childInstance,
    };
  }
}

function updateDomProperties(dom, preProps, nextProps) {
  const isEvent = name => name.startsWith('on');
  const isAttribute = name => !isEvent(name) && name !== 'children';

  Object.keys(preProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.removeEventListener(eventType, preProps[name]);
  });

  Object.keys(preProps).filter(isAttribute).forEach(name => {
    dom[name] = null;
  });

  Object.keys(nextProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, nextProps[name]);
  });

  Object.keys(nextProps).filter(isAttribute).forEach(name => {
    dom[name] = nextProps[name];
  });
}

function reconcile(parentDom, instance, element) {
  if (instance === null) {
    // 新建节点
    const newInstance = instantiate(element);
    newInstance.publicInstance
      && newInstance.publicInstance.componentWillMount
      && newInstance.publicInstance.componentWillMount();
    parentDom.appendChild(newInstance.dom);
    newInstance.publicInstance
      && newInstance.publicInstance.componentDidMount
      && newInstance.publicInstance.componentDidMount();
    return newInstance;
  } else if (element === null) {
    // 删除节点

    instance.publicInstance
    && instance.publicInstance.componentWillUnmount
    && instance.publicInstance.componentWillUnmount();
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.element.type !== element.type) {
    // 节点类型不同，整体替换
    const newInstance = instantiate(element);
    newInstance.publicInstance
    && newInstance.publicInstance.componentDidMount
    && newInstance.publicInstance.componentDidMount();
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  } else if (typeof element.type === 'string') {
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstance = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    if (
      instance.publicInstance
      && instance.publicInstance.shouldComponentUpdate
    ) {
      if (!instance.publicInstance.shouldComponentUpdate())
        return instance;
    }
    const { type } = element;
    const isClass = !!(type.prototype && type.prototype.isReactComponent);
    instance.publicInstance
      && instance.publicInstance.componentWillUpdate
      && instance.publicInstance.componentWillUpdate();
    let newChildElement;
    if (isClass) {
      instance.publicInstance.props = element.props;
      newChildElement = instance.publicInstance.render();
    } else {
      newChildElement = element.type(element.props);
    }
    const oldChildInstance = instance.childInstance;
    const newChildInstance = reconcile(instance.dom, oldChildInstance, newChildElement);
    instance.publicInstance
      && instance.publicInstance.componentDidUpdate
      && instance.publicInstance.componentDidUpdate();
    instance.dom = newChildInstance.dom;
    instance.childInstance = newChildInstance;
    instance.element = element;
    return instance;
  }
}

function reconcileChildren(instance, element) {
  const { dom, childInstance } = instance;
  const newChildElements = element.props.children || [];
  const count = Math.max(childInstance.length, newChildElements.length);
  const newChildInstance = [];
  for (let i = 0; i < count; i++) {
    newChildInstance[i] = reconcile(dom, childInstance[i], newChildElements[i]);
  }
  return newChildInstance.filter(child => child !== null);
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

function createPublicInstance(element, instance) {
  const { type, props } = element;
  const publicInstance = new type(props);
  publicInstance.__internalInstance = instance;
  return publicInstance;
}

class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);
    const parentDom = this.__internalInstance.dom.parentNode;
    const element = this.__internalInstance.element;
    reconcile(parentDom, this.__internalInstance, element);
  }
}

Component.prototype.isReactComponent = {};

export default {
  render,
  Component,
  createElement
}
