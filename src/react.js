import {
  commitWork,
  createDom,
  reconcileChildren,
  renderRecursively,
  createElement
} from "./utils.js";

let wipRoot,
  currentRoot,
  wipFiber,
  nextUnitOfWork = null;
let hookIndex = 0;

const NONE = Symbol("__NONE__");
export const useState = (initial) => {
  const oldHook = wipFiber?.alternate?.hooks[hookIndex];
  const hasPendingState = oldHook && oldHook.pendingState !== NONE;
  const oldState = oldHook ? oldHook.state : initial;
  const hook = {
    state: hasPendingState ? oldHook?.pendingState : oldState,
    pendingState: NONE
  };
  const setState = newState => {
    hook.pendingState = newState;
    scheduleRerender();
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

const createRoot = (_container) => ({
  render(el) {
    wipRoot = {
      // type: 'n/a', // a string or function
      dom: _container,
      props: {
        children: [el]
      },
      // // linked list
      // alternate - pending fiber
      // child - link to first child
      // parent - link to parent
      // sibling - link to next sibling
    };
    nextUnitOfWork = wipRoot;
  },
  renderRecursively(el) {
    renderRecursively(el, _container);
  },
});

const scheduleRerender = () => {
  nextUnitOfWork = wipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
  }
};

const workLoop = (deadline) => {
  let shouldYield = false;
  while (!shouldYield && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
  }
  requestIdleCallback(workLoop);
}

const noop = (fiber) => {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
};
const performUnitOfWork = (fiber, resetWipFiber = noop) => {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    resetWipFiber(fiber);
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children.flat());
  } else {
    // or a host component ... (so createDom)
    if (!fiber.dom) fiber.dom = createDom(fiber);
    reconcileChildren(fiber, fiber.props.children.flat());
  }
  if (fiber.child) return fiber.child;
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

requestIdleCallback(workLoop);

export default {
  useState,
  createRoot,
  createElement,
};
