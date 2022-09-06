# movies-android-backend
The server is hosted on Glitch: https://syadon-android-movies.glitch.me/

Database hosted with MongoDB Atlas on an AWS M0 sandbox cluster.
<table>
    <thead>
        <tr>
            <th>Tier</th>
            <th>Ram</th>
            <th>Storage</th>
            <th>vCPU</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
           <td> M0 Sandbox </td>
           <td>Shared </td>
           <td>512 MB</td>
           <td>Shared</td>
           <td>Free forever</td>
        </tr>
        <tr>
            <td colspan=5>M0 clusters are best for getting started, and are not suitable for production environments.</td>
        </tr>
        <tr>
            <td colspan=5>500 max connections | Low network performance | 100 max databases | 500 max collections</td>
        </tr>
    </tbody>
</table>

#### Endpoints
##### /movie/all
* Returns all available movies in JSON format.
##### /movie/list
* Returns only required fields for Android-Frontend's RecyclerView in JSON format
##### /movie/:id
* Returns movie data by specified id in JSON format

Frontend: https://github.com/Syadon786/movies-android
