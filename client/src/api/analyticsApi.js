export function getFuelEfficiency(){

 return delay([
   {
    vehicle:"MH-12 AB 4521",
    kmPerLiter:12.5
   },
   {
    vehicle:"MH-14 CD 7788",
    kmPerLiter:11.8
   },
   {
    vehicle:"MH-09 XY 3311",
    kmPerLiter:13.2
   }
 ]);

}



export function getCostPerKm(){

 return delay([
   {
    vehicle:"MH-12 AB 4521",
    costPerKm:8.4
   },
   {
    vehicle:"MH-14 CD 7788",
    costPerKm:9.1
   }
 ]);

}