class Queue<A> {
    protected xs: A[]

    constructor() {
        this.xs = [] 
    }

    get size (): number {
        return this.xs.length
    }

    public enqueue(x: A): void {
        this.xs.push(x)
    }

    public dequeue(): void {
        this.xs.shift()
    }

    public forEach(f: (x: A) => A): void {
        this.xs.forEach((x, i) => {
            this.xs[i] = f(x)
        })
    }

    public toArray(): ReadonlyArray<A> {
        return this.xs
    }
}

class BoundedQueue<A> extends Queue<A> {
    capacity: number

    constructor(capacity: number) {
        super()
        this.capacity = capacity 
    }

    public enqueue(x: A): void {
        super.enqueue(x)
        const exceedsCapacity = this.xs.length > this.capacity
        if (exceedsCapacity) {
            this.dequeue()
        }
    }
}


export { Queue, BoundedQueue }
