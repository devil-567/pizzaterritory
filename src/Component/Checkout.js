import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-use-history';
import commerce from "./lib/commerce";
import "../Component/Checkout.css"
import Footer from './Footer/Footer';

function Checkout({ cart, setOrder }) {
    const history = useHistory();
    const [firstname, setfirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [number, setNumber] = useState("");



    const [generatedtoken, setToken] = useState({});
    const [countiesList, setCountriesList] = useState([])
    const [subdivisionList, setSubdivisionList] = useState([])
    const [shippingOptions, setShippingOptions] = useState(null);
    const [country, setCountry] = useState(null);
    const [subdivision, setSubdivision] = useState(null);
    const [shipping, setShipping] = useState(null);

    const getShippingCountries = async (tokenID) => {
        const { countries } = await commerce.services.localeListShippingCountries(tokenID);
        setCountriesList(Object.entries(countries));
    }

    const getShippingSubdivision = async (country) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(country);
        setSubdivisionList(Object.entries(subdivisions));
        setSubdivision(Object.keys(subdivisions)[0]);

    }

    const getShippingOptions = async (tokenID, c, s) => {
        const response = await commerce.checkout.getShippingOptions(tokenID.id, {
            country: c,
            region: s,
        })
        setShipping(response[0].id)
        setShippingOptions(response);
    }


    useEffect(() => {
        const generateToke = async (cartID) => {
            const token = await commerce.checkout.generateToken(cartID, { type: 'cart' })
            setToken(token);
            console.log("token", token)
            getShippingCountries(token.id);
        }

        generateToke(cart?.id);

    }, [cart])

    useEffect(() => {
        if (country) { getShippingSubdivision(country); }

    }, [country])

    useEffect(() => {
        if (subdivision) { getShippingOptions(generatedtoken, country, subdivision); }

    }, [subdivision])




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (generatedtoken) {
            const incomingOrder = await commerce.checkout.capture(generatedtoken.id, {
                line_items: generatedtoken.line_items,
                customer: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                },
                shipping: {
                    name: 'Primary',
                    street: address,
                    town_city: city,
                    county_state: subdivision,
                    postal_zip_code: zip,
                    number:number,
                    country: country
                },
                fulfillment: {
                    shipping_method: shipping
                },

                payment: {
                    gateway: 'test_gateway',
                    card: {
                        number: '4242424242424242',
                        expiry_month: '02',
                        expiry_year: '24',
                        cvc: '123',
                        postal_zip_code: '94107',
                    },
                },
                pay_what_you_want: cart.subtotal.raw
            })

            setOrder(incomingOrder);
            history.push("/thanku");
            console.log("him",incomingOrder)
        }


    }
    return (
        <>
        <div className="checkout_wrap" style={{ marginTop: "100px" }}>
            <h2>Fill Details</h2>
            <br />
            <form onSubmit={e => handleSubmit(e)}>
                <div className="checkout__form">
                    <div className="checkout__column">
                        <label>First Name <span>*</span></label>
                        <input required name="firstname" value={firstname} onChange={e => setfirstName(e.target.value)} />
                    </div>

                    <div className="checkout__column">
                        <label>Last Name<span>*</span></label>
                        <input required name="lastname" value={lastname} onChange={e => setLastName(e.target.value)} />
                    </div>

                    <div className="checkout__column">
                        <label>Address<span>*</span></label>
                        <input required name="address" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>


                    <div className="checkout__column">
                        <label>Email<span>*</span></label>
                        <input required name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>


                    <div className="checkout__column">
                        <label>City<span>*</span></label>
                        <input required name="city" value={city} onChange={e => setCity(e.target.value)} />
                    </div>

                    <div className="checkout__column">
                        <label>Pin code<span>*</span></label>
                        <input required name="zipcode" value={zip} onChange={e => setZip(e.target.value)} />
                    </div>
                    <div className="checkout__column">
                        <label>Phone no<span>*</span></label>
                        <input required type="number" value={number} onChange={e => setNumber(e.target.value)} />
                    </div>


                    <div className="checkout__column">
                        <label>Country</label>
                        <select name="country" value={country} onChange={e => setCountry(e.target.value)}>
                            {
                                countiesList?.map(country => {
                                    return <option value={country[0]}>{country[1]}</option>
                                })
                            }

                        </select>
                    </div>
                    <div className="checkout__column">
                        <label>Subdivision</label>
                        <select value={subdivision} name="subdivision" onChange={e => setSubdivision(e.target.value)}>
                            {
                                subdivisionList?.map(subdivision => {
                                    return <option value={subdivision[0]}>{subdivision[1]}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="checkout__column">
                        <label>Delivery Charge</label>
                        <select name="subdivision" value={shipping} onChange={e => setShipping(e.target.value)}>
                            {
                                shippingOptions?.map(item => {
                                    return <option value={item.id}>{item.description} {item.price.formatted_with_symbol}</option>
                                })
                            }

                        </select>
                    </div>

                    <div className="checkout__column">
                        <label>&nbsp;</label>
                        <button>Place Order</button>
                    </div>
                </div>
            </form>
   
        </div>
        <Footer fixed="bottom"/>
        </>
    )
}

export default Checkout


