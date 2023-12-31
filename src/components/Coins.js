import React, { useEffect, useState } from 'react'
import axios from "axios"
import {server} from "../index"
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'



function Coins() {

  const [coins,setCoins] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
  const [page,setPage] = useState(1)
  const [currency,setCurrency] = useState("inr")

  const currencySymbol = currency === "inr"?"₹" : currency === "eur"?"€" : "$"

  const changePage = (page) =>{
    setPage(page);
    setLoading(true);
  }

  const btns = new Array(132).fill(1)

  useEffect(()=>{

    const fetchCoins = async ()=>{
      try {const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)


      setCoins(data)
      console.log(data)
      setLoading(false)} 
      catch{
        setError(true)
        setLoading(false)
      }
    }
    fetchCoins();
  },[currency,page])

  if(error){
    return <ErrorComponent message={"Error"} />
  }

  return (
    <Container maxW={"container.xl"}>
        {loading? (<Loader />) : (<>


          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            coins.map(i => (
              <CoinCard key={i.id} id={i.id} name={i.name} image={i.image} symbol={i.symbol} price={i.current_price
              } currencySymbol={currencySymbol}/>
            ))
          }
        </HStack>
        <HStack overflowX={"auto"} w={"full"} p={"8"} justifyContent={"space-evenly"}>
          {
            btns.map((item,index)=>(
              <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={() => changePage(index+1)}>{index + 1}</Button>
            ))
          }
        </HStack>
        </>)}
    </Container>
  );
};




export default Coins