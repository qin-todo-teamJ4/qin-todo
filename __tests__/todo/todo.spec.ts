import type { RenderResult } from "@testing-library/react-hooks";
import { act, renderHook } from "@testing-library/react-hooks";
import { describe, expect } from "vitest";

import type { UseTodoReturnType } from "./../../src/hooks/useTodo";
import { useTodo } from "./../../src/hooks/useTodo";

let result: RenderResult<UseTodoReturnType>;

beforeEach(() => {
  result = renderHook(() => {
    return useTodo();
  }).result;
});

describe("useTodoのテスト", () => {
  it("stateの初期値がvalue:'',isTyping:false,todoList:[]になっていること", () => {
    expect(result.current.state.value).toBe("");
    expect(result.current.state.isTyping).toBe(false);
    expect(result.current.state.todoList.length).toBe(0);
  });

  it("addTask関数でisTypingがtrueになること", () => {
    act(() => {
      result.current.addTask();
    });
    expect(result.current.state.isTyping).toBeTruthy();
  });

  it("cancelInput関数でisTypingがfalseになること", () => {
    result.current.state.isTyping = true;
    act(() => {
      result.current.cancelInput();
    });
    expect(result.current.state.isTyping).toBeFalsy();
  });

  it("inputTodo関数でstate.valueが更新されること", () => {
    act(() => {
      result.current.inputTodo("test");
    });
    expect(result.current.state.value).toBe("test");
  });

  it("checkTodo関数でstate.completedが更新されること", () => {
    const mockTodo: typeof result.current.state.todoList = [];
    const updateId = 5;
    for (let i = 0; i < 10; i++) {
      mockTodo.push({ id: i + 1, todo: `todo${i + 1}`, completed: false });
    }
    result.current.state.todoList = mockTodo;
    expect(result.current.state.todoList.length).toBe(10);
    act(() => {
      result.current.checkTodo(updateId);
    });
    result.current.state.todoList.forEach((todo) => {
      if (todo.id === updateId) {
        expect(todo.completed).toBeTruthy();
      } else {
        expect(todo.completed).toBeFalsy();
      }
    });
  });
});

describe("registerTodo関数のテスト", () => {
  const enterKeyPressEvent = {
    key: "Enter",
  } as React.KeyboardEvent<HTMLInputElement>;
  const otherKeyPressEvent = {
    key: "a",
  } as React.KeyboardEvent<HTMLInputElement>;

  it("state.valueが空,enter以外押下の場合は何も起こらないこと", () => {
    act(() => {
      result.current.registerTodo(otherKeyPressEvent);
    });
    expect(result.current.state.todoList.length).toBe(0);
    expect(result.current.state.value).toBe("");
  });

  it("state.valueが空の場合,enter押下時に何も起こらないこと", () => {
    act(() => {
      result.current.registerTodo(enterKeyPressEvent);
    });
    expect(result.current.state.todoList.length).toBe(0);
    expect(result.current.state.value).toBe("");
  });

  it("state.valueに値があり,enter以外押下の場合は何も起こらないこと", () => {
    result.current.state.value = "test";
    act(() => {
      result.current.registerTodo(otherKeyPressEvent);
    });
    expect(result.current.state.todoList.length).toBe(0);
    expect(result.current.state.value).toBe("test");
  });

  it("state.valueに値があり,enter押下時にデータが作成され、state.valueが空になること", () => {
    result.current.state.value = "test";
    act(() => {
      result.current.registerTodo(enterKeyPressEvent);
    });
    expect(result.current.state.todoList.length).toBe(1);
    expect(result.current.state.todoList[0].id).toBe(1);
    expect(result.current.state.todoList[0].todo).toBe("test");
    expect(result.current.state.todoList[0].completed).toBeFalsy();
    expect(result.current.state.value).toBe("");
  });

  it("todoListに10件のデータがある場合id:11,todo:(state.value),completed:falseのデータが追加されること", () => {
    result.current.state.value = "todo11";
    const mockTodo: typeof result.current.state.todoList = [];
    for (let i = 0; i < 10; i++) {
      mockTodo.push({ id: i + 1, todo: `todo${i + 1}`, completed: false });
    }
    result.current.state.todoList = mockTodo;
    act(() => {
      result.current.registerTodo(enterKeyPressEvent);
    });
    expect(result.current.state.todoList.length).toBe(11);
    expect(result.current.state.todoList[10].id).toBe(11);
    expect(result.current.state.todoList[10].todo).toBe("todo11");
    expect(result.current.state.todoList[10].completed).toBeFalsy();
    expect(result.current.state.value).toBe("");
  });
});
