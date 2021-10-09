import React, { Component, use } from 'react';
import "./Dashboard.css";
import Card1 from "../../assets/card1.svg";
import Card2 from "../../assets/card2.svg";
import Card3 from "../../assets/card3.svg";
import Card4 from "../../assets/card4.svg";
import Card5 from "../../assets/card5.svg";
// function RenderMenuItem({ dish }) {
//   return (
//     <Card>
//       <Link to={`/menu/${dish.id}`} >
//         <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
//         <CardImgOverlay>
//           <CardTitle>{dish.name}</CardTitle>
//         </CardImgOverlay>
//       </Link>
//     </Card>
//   );
// }
// function Menu(props) {
//   const menu = props.dishes.dishes.map((dish) => {
//     return (
//       <div key={dish.id} className="col-12 col-md-5 m-1">
//         <RenderMenuItem dish={dish}/>
//       </div>
//     );
//   });
//   if (props.dishes.isLoading) {
//     return (
//       <div className="container">
//         <div className="row">
//           <Loading />
//         </div>
//       </div>
//     );
//   }
//   else if (props.dishes.errMess) {
//     return (
//       <div className="container">
//         <div className="row">
//           <h4>{props.dishes.errMess}</h4>
//         </div>
//       </div>
//     );
//   }
//   else {
//     return (
//       <div className="container">
//         <div className="row">
//           <Breadcrumb>
//             <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
//             <BreadcrumbItem active>Menu</BreadcrumbItem>
//           </Breadcrumb>
//           <div className="col-12">
//             <h3>Menu</h3>
//             <hr />
//           </div>
//         </div>
//         <div className="row">
//           {menu}
//         </div>
//       </div>
//     );
//   }
// }
const ClassList = () => {
  const classes = [
    {
      "name":"Operating System",
      "admin":"Rishab Goyal",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
    {
      "name":"Computer Networks",
      "admin":"Manish Dhameja",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
    {
      "name":"Artificial Intelligence",
      "admin":"Jati Bajaj",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
    {
      "name":"Database",
      "admin":"Manish Dhameja",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
    {
      "name":"Theory of Computation",
      "admin":"Manish Dhameja",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
  ]
  const RenderClasses = () => {
    return (  
      classes.map((sub,index) => {
        let backgroundStyle ={};
        let card = Card1;
        switch (index%5) {
          case 0 : {
            backgroundStyle = {backgroundColor:"#E5F8F0",borderRadius:"12px"};
            card=Card1;
          }
          break;
          case 1 : {
            backgroundStyle = {backgroundColor:"#FFF3DA",borderRadius:"12px"};
            card=Card2;
          }
          break;
          case 2 : {
            backgroundStyle = {backgroundColor:"#E9E9FF",borderRadius:"12px"};
            card=Card3;
          }
          break;
          case 3 : {
            backgroundStyle = {backgroundColor:"#FFE9E9",borderRadius:"12px"};
            card=Card4;
          }
          break;
          case 4 : {
            backgroundStyle = {backgroundColor:"#FEE2FF",borderRadius:"12px"};
            card=Card5;
          }
        }
        // Swith(index%5)
        // if((index%5)===0){
        //   backgroundStyle = {backgroundColor:"#"}
        // }
        return (
          <div key={index} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center pb-5 px-md-4">
            <div class="card class-card" style={{width: "90%"}} style={backgroundStyle}>
              <img src={card} class="mx-auto p-3" height="180px"/>
              <div class="card-body m-3 mx-md-4 rounded-3" style={{backgroundColor:"#fff"}}>
                <h5 class="card-title heading-3">{sub.name}</h5>
                <p class="card-text">{sub.desc}</p>
                <a href={sub.link} target="_blank" class="card-link text-primary">{sub.link}</a>
              </div>
            </div>
          </div>
        );
      })
    );
  }
  return ( 
    <>
      <div className="col-12">
        <div class="row my-3 ms-0 content-box">
          <div className="col-12 heading-2 d-flex py-3 pb-4 justify-content-center">
            Classes 
          </div>
          <div className="col-12">
            <div className="row">
              <RenderClasses/>
            </div>
          </div>
        </div>
    </div>
    </>
   );
}

export default ClassList;