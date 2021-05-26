import pandas as pd
import dash
import dash_core_components as dcc
import dash_html_components as html
import plotly.graph_objects as go
import dash_table
import dash_bootstrap_components as dbc
import plotly.express as px
from sklearn.linear_model import LinearRegression
import numpy as np

df = pd.read_csv('file.csv')

df['fecha'] =  pd.to_datetime(df['fecha'])
df['fechaday'] =  df['fecha'].dt.date
df["costo"] = df["costo"].replace('[\$]',"",regex=True).astype(float)
df = df.sort_values(by=['fecha'])


## Model
def filter_data(df, start_date,end_date):
    mask1 = (df['fecha']>=start_date)
    mask2 = (df['fecha']<=end_date)

    filtered_df=df[mask1 & mask2]

    return filtered_df

def get_table(df):
    array = df['producto'].unique()
    mdf = pd.DataFrame()
    
    for item in array:
        ntr = df.loc[df['producto'] == item,'costo'].count()
        avcost = df.loc[df['producto'] == item,'costo'].mean()
        avcost = str(round(avcost, 2))
        mdf = mdf.append({'Producto' : item, 'Num Transacciones' : ntr, 'Precio promedio' : avcost}, 
                ignore_index = True)

    return mdf

## Layout
app = dash.Dash(__name__, external_stylesheets=['https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'])

nav = dbc.Nav(
    [
        dbc.NavItem(dbc.NavLink("F360 Dashboard", disabled=True, href="#")),
    ]
)

row1 = html.Div(className="",
        style = {'display': 'flex'},
        children=[
        html.Div(
            id="total-transact-div",
            className="col-md-1 card",
            style = {'margin-left': '30px'},
            children=[
                html.H4('0',id="total-transact", className="text-primary text-center"),
                html.P('Transactions', className="text-center"),
            ]
        ),
        html.Div(
            id="total-income-div",
            className="col-md-1  card",
            style = {'margin-left': '3%'},
            children=[
                html.H6('0',id="total-income", className="text-danger text-center"),
                html.P('Gross Income', className="text-center"),
            ]
        ),
        html.Div(
            style={'margin-left': 'auto'},
            className="col-md-3",
            children=[
                html.H6("Select a Date Range"),
                dcc.DatePickerRange(
                    id="date-range-select",
                    display_format="DD MMM YY",
                    start_date=df['fechaday'].min().strftime('%Y-%m-%d'),
                    end_date=df['fechaday'].max().strftime('%Y-%m-%d')
                ),
            ]
        )
    ])


row2 = html.Div(className="row",
        style = {'padding-bottom': '3%', 'padding-top': '3%', 'margin-left':'1%'},
        children=[
            dcc.Graph(
                        id="daily-income",
                        className="col-5 card",
                        style = {'margin-left': '30px'},
                        figure={}
                    ),
            dcc.Graph(
                        id="daily-transaction",
                        className="col-6 card",
                        style = {'margin-left': '30px'},
                        figure={}
                    )
        ]
       ) 

row3 = html.Div(className="row",
        style = {'padding-bottom': '10px', 'padding-top': '10px', 'min-height': '400px', 'margin-left':'3%'},
        children=[    
            dcc.Graph(
                        id="pie-chart",
                        className="card",
                        style = {'margin-right': '10px', 'width': '42%'},
                        figure={}
                    ),
            html.Div(
                    className="col-6",
                    style = {'margin-left': '10px'},
                    children=[
                        dash_table.DataTable(
                            id='table',
                            columns=[
                                {'name': 'Producto', 'id': 'Producto'},
                                {'name': 'Num Transacciones', 'id': 'Num Transacciones'},
                                {'name': 'Precio promedio', 'id': 'Precio promedio'},
                            ],
                            style_cell={'width': '50px', 'text-align':'center'},
                            style_table={
                                'maxHeight': '450px',
                                'overflowY': 'scroll'
                            },
                        )
                    ]
                )
        ]
       ) 


@app.callback(
    [
        dash.dependencies.Output('total-transact', 'children'),
        dash.dependencies.Output('total-income', 'children'),
    ],
    (
        dash.dependencies.Input('date-range-select', 'start_date'),
        dash.dependencies.Input('date-range-select', 'end_date'),
    )
)
def update_cards(start_date, end_date):
    dff = filter_data(df, start_date, end_date)
    
    income = dff['costo'].sum()
    transact = dff.shape[0]
    
    return [str(transact), str(round(income, 2))]

@app.callback(
    dash.dependencies.Output('table', 'data'),
    (
        dash.dependencies.Input('date-range-select', 'start_date'),
        dash.dependencies.Input('date-range-select', 'end_date'),
    )
)
def update_table(start_date, end_date):
    dff = filter_data(df, start_date, end_date)
    table_df = get_table(dff)
    return table_df.to_dict('records')

@app.callback(
    dash.dependencies.Output('daily-income', 'figure'),
    (
        dash.dependencies.Input('date-range-select', 'start_date'),
        dash.dependencies.Input('date-range-select', 'end_date'),
    )
)
def update_dailyincome(start_date,end_date):
    dff = filter_data(df, start_date, end_date)
    dff = dff.resample('D', on="fecha").sum()
    traces = []

    traces.append(go.Scatter(
            x=list(dff.index),
            y=list(dff['costo']),
            name='Income'
        ))
    
    return {"data": traces,
            "layout": go.Layout(title="Daily income", 
                                xaxis={"title": "Date"}, 
                                yaxis={"title": "Income"})}

@app.callback(
    dash.dependencies.Output('daily-transaction', 'figure'),
    (
        dash.dependencies.Input('date-range-select', 'start_date'),
        dash.dependencies.Input('date-range-select', 'end_date'),
    )
)
def update_dailytrans(start_date,end_date):
    dff = filter_data(df, start_date, end_date)
    #print(dff)
    dfi = dff.resample('D', on="fecha").count()
    dfj = dff.resample('D', on="fecha").sum()
    #print(dfi)
    #print(dfj)
    traces = []
    model = LinearRegression()
    X = dfi.costo.values.reshape(-1, 1)
    model.fit(X, dfj.costo)

    x_range = np.linspace(X.min(), X.max(), 100)
    y_range = model.predict(x_range.reshape(-1, 1))

    fig = px.scatter( x=dfi['costo'], y=dfj['costo'], opacity=0.65, labels=
    dict(x="Num Transactions", y="Income ($)"))
    fig.add_traces(go.Scatter(x=x_range, y=y_range, name='Regression Fit'))

    # traces.append(go.Scatter(
    #         x=list(dfi.index),
    #         y=list(dfi['costo']),
    #         name='Income'
    #     ))
    
    return fig

@app.callback(
    dash.dependencies.Output('pie-chart', 'figure'),
    (
        dash.dependencies.Input('date-range-select', 'start_date'),
        dash.dependencies.Input('date-range-select', 'end_date'),
    )
)
def update_pie(start_date,end_date):
    dff = filter_data(df, start_date, end_date)
    table_df = get_table(dff)
    traces = []

    traces.append(go.Pie(labels=table_df['Producto'], values=table_df['Num Transacciones'], hole=.3))

    return {"data": traces,
            "layout": go.Layout(title="Daily transactions by type")}

app.layout = html.Div(children=[
    html.Div(nav),
    html.Div(
    className="container-fluid py-0",
    children=[row1, row2, row3
        
    ]
    
    )
    
])

## Controller

if __name__ == "__main__":
    app.run_server(host='127.0.0.1', port=8050, debug=True)
    