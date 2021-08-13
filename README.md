

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.





# React Pivot Table
Configurable pivot table as a React component.

## Install
Once you've  cloned this repository, install NPM dependencies.
```Shell
npm install
```
## Usage
since this pivot table is not generally specific  for a certain data set, below are some configurable Dimensions 
based on the current data set. Multiple multiple dimensions are supported at least on the row dimensions.
Only one metric is supported at the moment "sales" of a number type.
```JSX
export default class App extends React.Component {
  /**
   * Loads the sales data after the component is loaded.
   *
   * @returns A promise that resolves when the sales data have been loaded.
   */
  public async componentDidMount(): Promise<void> {
    this.salesData = await getSales();

    this.setState({}); // eslint-disable-line react/no-did-mount-set-state
  }

  /**
   * The sales data  to aggregate in the pivot table.
   */
  private salesData: Sales[] = [];

  /**
   * Renders the app.
   *
   * @returns The rendered app.
   */
  /**
   * The fields that represent the columns of the table.
   */
  public render(): JSX.Element {
    const columnDimensions: [Dimension<Sales>] = [
      { name: 'State', property: 'state' }
    ];
    /**
   * The fields that represent the rows of the table.
   */
    const rowDimensions: Array<Dimension<Sales>> = [
      { name: 'Category', property: 'category' },
      { name: 'Sub-Category', property: 'subCategory' }
    ];
  /**
   * The fields that represent the main titles  on columns of the table.
   */
    const title = {
      column: 'States',
      row: 'Products'
    };

    return (
      <PivotTable
        aggregator={aggregators.sum}
        columnDimensions={columnDimensions}
        data={this.salesData}
        metric='sales'
        rowDimensions={rowDimensions}
        title={title}
      />
    );
  }
}
```
The dataset is currently embedded in this project but when having a remote dataset it is appropriate to use 
React Hooks for loading the dataset from an API

```JSX
 const url="api_url";
  const [data, setData]=useState([]);
  useEffect(() =>{
    const fetchData=async ()=>{
      const res=await fetch(url);
      const json= await res.json();
      setData(json.hits)
    };
    fetchData();
  },[setData]);
```
### Architectural Overview
* The Column Dimension and Row Dimension values  and data to be pivoted are configured at the start unless the table won't display any data.

The data to be pivoted is filtered based on the column dimension and row dimension which ensures that all the values are represented accordingly. From the representation of the data we are able to get the total of  "rows" and also the aggregation of the data based on the set metric "sales".

### Assumptions and Simplifications Made
* Only one metric is supported.
* Dimensions should be configurable in code and multiple dimensions should be supported, at least on the row dimensions.
* The number values are all rounded to the nearest whole number.

### The Next Steps
* Making sure the rows are well sorted based on the rowData in a ascending order.
* Ensuring that the data in the table can be filter or searched based  on keywords or properties.
* Ensuring that it is responsive in any screen it is displayed on when it is added to an application.
* Having an interactive way that users can input or choose the metrics to be aggregated.