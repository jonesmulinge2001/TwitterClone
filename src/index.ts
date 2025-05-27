
// Define the interface for user, posts, comments
interface User {
    id: number;
    name:string;
    username: string;
    email:string;
    phone:string;
    website:string;
    comapny:{
        name: string;
        catchPhrase: string;
        bs: string;
    }
    address:{
        street:string;
        city:string;
        zicode:string;
        geo:{
            lat:string;
            lng:string;
        }
    }
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

// Select DOM elements
const userDisplay = document.getElementById("user") as HTMLSelectElement;
const postDisplay = document.getElementById("userPosts") as HTMLUListElement;
const commentDisplay = document.getElementById("ListComments") as HTMLUListElement;
const userDetails = document.getElementById("userDetails") as HTMLUListElement;

// Fetch users and display them in a select dropdown element
let userData: User[] ;
const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.ok) {
        userData = await response.json();
        userData.forEach((user) => {
            const optionElement = document.createElement("option");
            optionElement.value = user.id.toString();
            optionElement.textContent = user.name;
            userDisplay.appendChild(optionElement);
        });
    }
    userDisplay.value = '1';
    fetchPosts(1);
    displayUserDetails(1 ,userData);
};

// async function to display userDetails
const displayUserDetails = (userId:number, users:User[]) =>{
    const user = users.find(u => u.id === userId)
    if(user){
        userDetails.innerHTML = '';
        const details = [
            `${user.name}`,
            `${user.username}`,
            `${user.website}`,
            `${user.address.city}`,
        ]
        details.forEach((det) =>{
            const liDetail = document.createElement("li");
            liDetail.textContent = det;
            userDetails.appendChild(liDetail);
        })
    }

};

// Function to fetch posts for a given selected user
const fetchPosts = async (userId: number) => {
    const myRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (myRes.ok) {
        const postData: Post[] = await myRes.json();
        postDisplay.innerHTML = '';
        commentDisplay.innerHTML = '';

        postData.forEach((post) => {
            const divContent = document.createElement('div');
            divContent.className = 'postAndImage';
            const liElement = document.createElement("li");

            // creating reaction elements
            const pComment = document.createElement("p");
            const PShare = document.createElement('p');
            const pLove = document.createElement('p');

            // create a hr element
            const hr = document.createElement('hr');


            const iLove = document.createElement('i');
            iLove.className = 'bx bxs-heart';
            iLove.style.color = 'red'

            const iComment = document.createElement('i');
            iComment.className = 'bx bxs-comment';
            iComment.style.color = 'blue'

            const iShare = document.createElement('i');
            iShare.className = 'bx bxs-share-alt';
            iShare.style.color = 'green'


            pComment.textContent = '200';
            PShare.textContent = '200';
            pLove.textContent = '200';

            // create div to hold reaction elements
            const divReaction = document.createElement('div');
            divReaction.className = 'reactionDiv';
            divReaction.appendChild(iComment)
            divReaction.appendChild(pComment);
            divReaction.appendChild(iShare);
            divReaction.appendChild(PShare);
            divReaction.appendChild(iLove);
            divReaction.appendChild(pLove);

            const imageElement = document.createElement("img");
            imageElement.src = "./images/jonajack.jpg";
            liElement.textContent = post.body;
            liElement.addEventListener("click", () => {
                fetchComments(post.id);
            });
            divContent.appendChild(imageElement);
            divContent.appendChild(liElement);
            postDisplay.appendChild(divContent);
            postDisplay.appendChild(divReaction);
            postDisplay.appendChild(hr);
            
        });
        if (postData.length > 0) {
            fetchComments(postData[0].id);
        }
    }
};

// Function to fetch comments for a given post
const fetchComments = async (postId: number) => {
    const myComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    if (myComments.ok) {
        const commentData: Comment[] = await myComments.json();
        commentDisplay.innerHTML = '';
        commentData.forEach((comment) => {
            const divComment = document.createElement('div');

            const reactDiv = document.createElement('div');
            reactDiv.className = 'reactions'
            const msgP = document.createElement('p');
            const loveP = document.createElement('p');
            const shareP = document.createElement('p');
            const hr = document.createElement('hr');

            const love = document.createElement('i');
            love.className = 'bx bxs-heart';
            love.style.color = 'red'
            const repost = document.createElement('i');
            repost.className = 'bx bxs-share';
            repost.style.color = 'blue'
            const msgcomment = document.createElement('i');
            msgcomment.className = 'bx bxs-comment';
            msgcomment.style.color = 'blue';

            // add textcontent to the ps
            msgP.textContent = '0';
            loveP.textContent = '0';
            shareP.textContent = '0';

            // append to the reaction div
            reactDiv.appendChild(msgP);
            reactDiv.appendChild(msgP);
            reactDiv.appendChild(repost)
            reactDiv.appendChild(loveP);
            reactDiv.appendChild(love);
            reactDiv.appendChild(shareP);

            divComment.className = 'commentAndImage';
            const li = document.createElement("li");
            const imageElement = document.createElement("img");
            imageElement.src = "./images/jonajack.jpg";
            li.innerHTML = `${comment.email}: ${comment.body}`;
            divComment.appendChild(imageElement);
            divComment.appendChild(li);
            commentDisplay.appendChild(divComment);
            commentDisplay.appendChild(reactDiv);
            commentDisplay.appendChild(hr)
            
        });
    }
};

// eventListener to the dropdown display change select
userDisplay.addEventListener('change', () => {
    const userId = parseInt(userDisplay.value);
    fetchPosts(userId);
    displayUserDetails(userId,userData)
});

fetchUsers();
