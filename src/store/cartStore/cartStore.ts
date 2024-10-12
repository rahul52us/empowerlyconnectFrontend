import { action, makeAutoObservable, observable } from "mobx";

class CartStore {
  userAddedItems: any = {
    users: {},
    totalItems: 0,
  };

  constructor() {
    makeAutoObservable(this, {
      userAddedItems: observable,
      setUserAddedItems: action,
    });
  }

  getTotalCounts = (users: any) => {
    let totalCount = 0;

    Object.keys(users).forEach((userId) => {
      const userCart = users[userId];

      if (userCart && typeof userCart === "object") {
        totalCount += Object.keys(userCart).length;
      }
    });
    this.userAddedItems.totalItems = totalCount;
  };

  setUserAddedItems = (
    item: any,
    action: "add" | "remove",
    userId: string,
    TotalNoOfQuantities: number = 1
  ) => {
    if (!this.userAddedItems.users[userId]) {
      this.userAddedItems.users[userId] = {};
    }

    if (action === "add") {
      if (TotalNoOfQuantities && TotalNoOfQuantities > 0) {
        if (!this.userAddedItems.users[userId][item._id]) {
          this.userAddedItems.users[userId][item._id] = {
            ...item,
            TotalNoOfQuantities: TotalNoOfQuantities,
          };
        } else {
          this.userAddedItems.users[userId][item._id].TotalNoOfQuantities +=
            TotalNoOfQuantities;
        }
        this.getTotalCounts(this.userAddedItems.users);
      } else {
        console.log(
          "Quantity must be provided and greater than 0 to add the item."
        );
      }
    } else if (action === "remove") {
      if (this.userAddedItems.users[userId][item._id]) {
        if (TotalNoOfQuantities && TotalNoOfQuantities > 0) {
          this.userAddedItems.users[userId][item._id].TotalNoOfQuantities -=
            TotalNoOfQuantities;
        } else {
          this.userAddedItems.users[userId][item._id].TotalNoOfQuantities -= 1;
        }

        this.getTotalCounts(this.userAddedItems.users);

        if (
          this.userAddedItems.users[userId][item._id].TotalNoOfQuantities <= 0
        ) {
          delete this.userAddedItems.users[userId][item._id];
          this.getTotalCounts(this.userAddedItems.users);
        }
      }
    }
  };
}

export default CartStore;
