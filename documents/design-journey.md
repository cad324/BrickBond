<h1>BrickBonds: Dev Journey</h1>

<h2>Table of Contents</h2>

- [Purpose](#purpose)
  - [Intended Use Case](#intended-use-case)
- [Target Audience(s)](#target-audiences)
  - [Multifamily real estate issuers](#multifamily-real-estate-issuers)
  - [Commercial real estate issuers](#commercial-real-estate-issuers)
- [Persona](#persona)
  - [Background & Skills](#background--skills)
  - [Motivations & Attitudes](#motivations--attitudes)
  - [Attitude to Technology](#attitude-to-technology)
- [Information Architecture, Content & Navigation](#information-architecture-content--navigation)
- [Initial Sketches](#initial-sketches)
- [Current Interface](#current-interface)
- [Design Evaluation](#design-evaluation)
  - [Cognitive Walkthrough](#cognitive-walkthrough)
- [Amazon Web Services & Smart-Contract Interaction](#amazon-web-services--smart-contract-interaction)
  - [API Gateway](#api-gateway)
  - [Lambda Functions](#lambda-functions)
  - [DynamoDB](#dynamodb)
  - [Connecting to Smart-Contract](#connecting-to-smart-contract)
- [Application State Management](#application-state-management)
  - [React Hooks](#react-hooks)
  - [Redux Toolkit](#redux-toolkit)
- [Additional Comments & Next Steps](#additional-comments--next-steps)

## Purpose

Real estate investors are often faced with the challenge of raising money to fund their next deals. Many times they have to seek capital from accredited investors (usually people with a net worth of $1M+ or those who earn over $200K/yr). Other times they have to settle for high interest loans that eat into profits.

BrickBonds provides an alternative fundraising solution for real estate investors via the securitization of rental properties.

### Intended Use Case

Rental property owners (which I will refer to as **issuers** from now on) can create tokens - called Bricks - that represent fractions of a real estate property. Then ordinary people can purchase these tokens (**investors**). Token holders can then proportionally benefit from rental income in the form of dividends.

The money raised from the Security Token Offering (STO) can then be used to fund a separate rental property.

## Target Audience(s)

### Multifamily real estate issuers

- Multifamily real estate ranges from 1-4 units (i.e, condos, duplexes, triplexes and quadraplexes).
- Multifamily real estate owners tend to face tighter financing options from banks as they attempt to buy more properties. Furthermore, they typically still need to come up with downpayments each time they attempt to get new properties under contract.

### Commercial real estate issuers

- Commercial real estate are larger properties of 5+ units.
- Commercial real estate issuers need large amounts of capital, from hundreds of thousands of dollars to millions. These investors typically need to convince a few high net worth individuals to invest sums of tens of thounds of dollars or more to acquire new properties.

## Persona

Our persona is [Pat](pat-persona.pdf).

### Background & Skills

Pat works as an accountant in consulting firm. She prefers to stay with the technologies for which she has already mastered the peculiarities. She just moved to this employer 1 week ago, and their software systems are new to her.
 

She  describes herself as a "numbers person", but she is not a professional programmer and has never taken any computer programming or IT systems classes. Pat has a degree in accounting so she knows plenty of Math and knows how to think with numbers.
 

In her free time, even though she's an accountant and deals with numbers all day it work, she likes working with numbers in her free time, too. She especially likes Sudoku and other computer games that involve puzzling.

### Motivations & Attitudes

Motivations: Pat learns new technologies when she  needs to, but she doesn't spend her  free time exploring technology  or exploring obscure functionality of programs and devices thatshe  uses. She  tends to use methods she  is already familiar and comfortable with to achieve her  goals.

Computer Self-Efficacy: Pat has medium computer self-efficacy about doing unfamiliar computing tasks. If problems arise with her  technology, she  will keep on trying to figure out how to achieve what she has set out to do for quite awhile; she doesn't give up right away when computers or technology present a challenge to her.

Attitude toward Risk: Pat is busy and so she  rarely has spare time. So Pat is risk averse and worries that she will spend time on them and not get any benefits from doing so. she  prefers to perform tasks using familiar features, because they're more predictable about what she  will get from them and how much time they'll take.

### Attitude to Technology

Information Processing Style: Pat leans towards a comprehensive information processing style when she  needs to gather information to problem-solve. So, instead of acting upon the first option that seems promising, she  first gathers information comprehensively to try to form a complete understanding of the problem before trying to solve it.Thus, her  style is "burst-y"; first she  reads a lot, then she  acts on it in a batch of activity.

Learning: by Process vs. by Tinkering : When Pat sees a need to learn new technology, she  does so by trying out new features or commands to see what they do and to understand how the software works. When she  does this, she does so purposefully; that is, she  reflects on each bit of feedback she  gets along the way to understand how the feature might benefit her. Eventually, if she  doesn't think it will get her closer to what she  wants to achieve, she will revert back to ways that she  already knows will work.

## Information Architecture, Content & Navigation

## Initial Sketches

## Current Interface

## Design Evaluation

### Cognitive Walkthrough

## Amazon Web Services & Smart-Contract Interaction

### API Gateway

### Lambda Functions

### DynamoDB

### Connecting to Smart-Contract

Each Ethereum contract has a unique address. For development purposes, the contracts here are deployed at `http://localhost:8548`.

Connecting to our contract requires Web3 (a collection of JS libraries that lets you interact with an Ethereum node locally).

```
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
web3.eth.net.isListening()
   .then((e) => console.log('[Web3 Connected]', e))
   .catch(e => console.log('[Web3 Connection]'+ e));

const BrickBond = new web3.eth.Contract(
  ContractABI,
  "[CONTRACT_ADDRESS_HERE]" //New contract address here
);
```

## Application State Management

State management has handled using two methods: React Hooks & Redux Toolkit

### React Hooks

React hooks in the application is used primarily for managing component-level states (more true as the current codebase evolves to make more use of Redux).

For example, in forms such as the Register Property form, there is no need for other components to have access to what is being entered into the fields by the user (i.e. there is no need to store the state in the store). When the user enters the street, city, province, and zip code of the property and then submits, these values will not be needed anywhere else once the new property is added to the store.

### Redux Toolkit

![](redux-vs-react.svg)
<cite>Image from: css-tricks.com</cite>

Redux simplifies our operations by creating a single source of truth via the store. 

For example, in BrickBonds we need to know the MetaMask address for most of the components we work with. Instead of relying on passing props down a chain a components, we can access the address directly from the store.

Likewise, when a user mints a new brick or registers a new property, instead of calling a function in a child component to update the state in a parent component, the state can be updated directly to the store.

The redux information architechture will be increasingly useful as the application increases in complexity.


<h4>Address slice</h4>

```
export const addresserSlice = createSlice({
    name: 'address',
    initialState: {
        address: '0'
    },
    reducers: {
        addresser: (state, action) => {
            state.address = action.payload
        }
    }
});
```

<h4>Dispatch new address</h4>

```
const dispatch = useDispatch();

dispatch(addresser('0xabcdef'));
```

Get address value from anywhere in the app, directly from the store.

```
const address = useSelector((state) => state.addresser.address);
```

## Additional Comments & Next Steps



<h3>Next Steps</h3>

- [ ] - Implement delete UI for images
- [ ] - Implement delete function for S3 Objects and dynamo db records.
- [ ] - Make search bar functional 
- [ ] - Implement investor screen in app