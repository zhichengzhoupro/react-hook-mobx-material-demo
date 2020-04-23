import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField} from "@material-ui/core";
import React from "react";

function UserInformation(props: { onChange: (event: any) => void, user: any }) {
    return (
        <Card>
            <form
                autoComplete="off"
                noValidate
            >
                <CardHeader
                    subheader="The information can be edited"
                    title="User Detail"
                />
                <Divider/>

                <CardContent>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >

                        </Grid>
                    </Grid>
                </CardContent>

                <Divider/>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        Save User Detail
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default UserInformation;