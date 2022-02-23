/* eslint-disable @typescript-eslint/no-unused-vars */
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
  it("stateの初期値がvalue:'',isCreate:false,todoList:[]になっていること", () => {
    expect(result.current.state.value).toBe("");
    expect(result.current.state.isCreate).toBe(false);
    expect(result.current.state.todoList.length).toBe(0);
  });

  it("addTask関数でisCreateがtrueになること", () => {
    act(() => {
      result.current.addTask();
    });
    expect(result.current.state.isCreate).toBeTruthy();
  });

  it("cancelInput関数でisCreateがfalseになること", () => {
    result.current.state.isCreate = true;
    act(() => {
      result.current.cancelInput();
    });
    expect(result.current.state.isCreate).toBeFalsy();
  });

  it("inputTodo関数でstate.valueが更新されること", () => {
    act(() => {
      result.current.inputTodo("test");
    });
    expect(result.current.state.value).toBe("test");
  });
});
