import { describe, expect, it, vi } from 'vitest';
import { createOperationCapabilities } from './platform-core-operation-capabilities';
import { installOperationNodeMethods } from './platform-core-operation-node-methods';
import { createOperationRecovery } from './platform-core-operation-recovery';

function capabilityController() {
  let enabled3 = false;
  let record3: Record<string, unknown> = {};
  const config = {
    caps: { oneOrder: false, stream: false, opsOnFeed: false },
    capsSettled: () => true,
  };
  let operations: ReturnType<typeof createOperationCapabilities>;
  operations = createOperationCapabilities({
    get dataOperationControlVerdict() {
      return config;
    },
    get record3() {
      return record3;
    },
    get enabled3() {
      return enabled3;
    },
    set enabled3(value) {
      enabled3 = value;
    },
    get loadDataOperationControlVerdictHandler2() {
      return operations.loadDataOperationControlVerdictHandler2;
    },
    get loadDataOperationControlVerdictHandler4() {
      return operations.loadDataOperationControlVerdictHandler4;
    },
    get loadDataOperationControlVerdictHandler5() {
      return operations.loadDataOperationControlVerdictHandler5;
    },
    get honourOpsOnFeed() {
      return operations.honourOpsOnFeed;
    },
  });
  return {
    operations,
    config,
    settle() {
      enabled3 = true;
    },
    replaceCaps(value: Record<string, unknown>) {
      record3 = value;
    },
  };
}

describe('operation controller module boundaries', () => {
  it('preserves class method descriptors, signatures and constructor-time dispatch', () => {
    const methods = {
      increment(this: { value: number }, amount = 1) {
        this.value += amount;
        return this.value;
      },
      read(this: { value: number }, _unused?: unknown, ..._extra: unknown[]) {
        return this.value;
      },
    };
    class Node {
      [key: string]: unknown;
      value = 0;
      constructor() {
        (this.increment as (amount: number) => number)(2);
      }
    }
    installOperationNodeMethods(Node.prototype, [methods]);
    const node = new Node();
    expect(node.value).toBe(2);
    expect(Reflect.ownKeys(Node.prototype)).toEqual([
      'constructor',
      'increment',
      'read',
    ]);
    expect(Object.keys(Node.prototype)).toEqual([]);
    expect(
      Object.getOwnPropertyDescriptor(Node.prototype, 'increment'),
    ).toEqual({
      value: methods.increment,
      writable: true,
      configurable: true,
      enumerable: false,
    });
    expect(methods.increment.name).toBe('increment');
    expect(methods.increment.length).toBe(0);
    expect(methods.read.length).toBe(1);
    expect(() => Reflect.construct(methods.increment, [])).toThrow(TypeError);
    expect(methods.increment.call({ value: 10 }, 3)).toBe(13);
  });

  it('reads current capabilities without sharing controller state', () => {
    const first = capabilityController();
    const second = capabilityController();
    expect(first.operations.loadDataOperationControlVerdictHandler4()).toBe(
      false,
    );
    first.config.caps.oneOrder = true;
    expect(first.operations.loadDataOperationControlVerdictHandler4()).toBe(
      true,
    );
    expect(second.operations.loadDataOperationControlVerdictHandler4()).toBe(
      false,
    );
    first.settle();
    expect(first.operations.loadDataOperationControlVerdictHandler4()).toBe(
      false,
    );
    expect(first.operations.capsSettled()).toBe(true);
    first.replaceCaps({ opsOnFeed: true, atRevPaging: 2 });
    expect(first.operations.loadDataOperationControlVerdictHandler6()).toBe(
      true,
    );
    expect(second.operations.loadDataOperationControlVerdictHandler6()).toBe(
      false,
    );
    expect(first.operations.loadDataOperationControlVerdictHandler2.name).toBe(
      'loadDataOperationControlVerdictHandler2',
    );
    expect(
      first.operations.loadDataOperationControlVerdictHandler2.length,
    ).toBe(1);
  });

  it('writes through the state bridge and reads the newest lookup after async recovery', async () => {
    let enabled23 = true;
    let lastResult: unknown = 'pending';
    let currentOp: unknown = 'old-op';
    let release!: () => void;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    const oldPump = vi.fn();
    const newPump = vi.fn();
    let lookup = new Map([['old-node', { pump: oldPump }]]);
    const receiverCheck = vi.fn(function (this: unknown) {
      expect(this).toBeUndefined();
      return pending;
    });
    const recovery = createOperationRecovery({
      get loadDataOperationControlVerdictResult19() {
        return lastResult;
      },
      set loadDataOperationControlVerdictResult19(value) {
        lastResult = value;
      },
      get enabled23() {
        return enabled23;
      },
      set enabled23(value) {
        enabled23 = value;
      },
      get loadDataOperationControlVerdictResult3() {
        return currentOp;
      },
      set loadDataOperationControlVerdictResult3(value) {
        currentOp = value;
      },
      get loadDataOperationControlVerdictHandler29() {
        return receiverCheck;
      },
      get lookup() {
        return lookup;
      },
    });
    recovery.ObservabilityTelemetryState122();
    expect([lastResult, enabled23, currentOp]).toEqual([null, false, null]);
    expect(receiverCheck).toHaveBeenCalledOnce();
    lookup = new Map([['new-node', { pump: newPump }]]);
    release();
    await pending;
    expect(oldPump).not.toHaveBeenCalled();
    expect(newPump).toHaveBeenCalledOnce();
  });

  it('creates callbacks without eagerly reading uninitialized state', () => {
    const unavailable = () => {
      throw new ReferenceError('controller state is not initialized');
    };
    const recovery = createOperationRecovery({
      get loadDataOperationControlVerdictResult19() {
        return unavailable();
      },
      set loadDataOperationControlVerdictResult19(_value) {
        unavailable();
      },
      get enabled23() {
        return unavailable();
      },
      set enabled23(_value) {
        unavailable();
      },
      get loadDataOperationControlVerdictResult3() {
        return unavailable();
      },
      set loadDataOperationControlVerdictResult3(_value) {
        unavailable();
      },
      get loadDataOperationControlVerdictHandler29() {
        return unavailable();
      },
      get lookup() {
        return unavailable();
      },
    });
    expect(() => recovery.ObservabilityTelemetryState122()).toThrow(
      ReferenceError,
    );
  });
});
