import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      items: [
        {
          id: 1,
          title: "Chair grey",
          img: "/img/chair-grey.jpg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "chairs",
          price: "49.99",
        },
        {
          id: 2,
          title: "Table oak",
          img: "/img/table-oak.jpg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "tables",
          price: "199.99",
        },
        {
          id: 3,
          title: "Sofa blue",
          img: "/img/sofa-blue.jpg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "sofas",
          price: "499.99",
        },
        {
          id: 4,
          title: "Lamp desk",
          img: "/img/lamp-desk.jpg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "lamps",
          price: "29.99",
        },
        {
          id: 5,
          title: "Shelf wall",
          img: "/img/shelf-wall.jpg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "shelves",
          price: "39.99",
        },
        {
          id: 6,
          title: "Armchair leather",
          img: "/img/armchair-leather.jpg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "chairs",
          price: "299.99",
        },
      ],
    };
  }

  addToOrder = (item) => {
    /*console.log("Adding to order:", item.title);*/
    this.setState({ orders: [...this.state.orders, item] });
  };

  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} />
        <h2 className="section-title">Catalog</h2>
        <Items items={this.state.items} onAdd={this.addToOrder} />
        <Footer />
      </div>
    );
  }
}

export default App;
