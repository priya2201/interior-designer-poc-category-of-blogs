let service = {
  arrowFn: function () {
    console.log(this);
    //   let bk = function () {
    //     console.log(this);
    //   };
    let bk = () => console.log(this);
    bk();
  },
};
service.arrowFn();
