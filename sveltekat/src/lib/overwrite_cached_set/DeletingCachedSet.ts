type TNull<T> = T | null

class DeletingCachedSet<T> {
  data: TNull<T>[] 

  constructor() {
    this.data = []  
  }

  push(new_data: T) {
    var oldSize = this.data.length 
    this.data.filter(element => element !== new_data)
    if (this.data.length != oldSize) { return }
    this.data.push(new_data)
  }
  
}
