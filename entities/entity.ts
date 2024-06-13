export interface IEntity {
  toJson(): Record<string, unknown>;
}

export abstract class Entity<T> implements IEntity {
  toJson() {
    const jsonObj: Record<string, unknown> = {};
    for (const key of Object.keys(this)) {
      jsonObj[key] = (this as any)[key];
    }
    return jsonObj;
  }

  mergeWith(overrides: Partial<T>): T {
    return { ...this, ...overrides } as T;
  }

  copyWith(overrides: Partial<T>): this {
    const merged = this.mergeWith(overrides);
    return new (this.constructor as new (init: T) => this)(merged);
  }
}
