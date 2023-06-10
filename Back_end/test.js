var sortedArrayToBST = function(nums) {
  const root=createTree(nums,0,nums.length-1)
  return root;
};

function createTree(arr,left,right){
  if(left>right){
      return null
  }

  const mid=Math.floor((right-left)/2);
  console.log('check here ',left,right,mid )
  const root=new TreeNode(arr[mid])
  root.left=createTree(arr,left,mid-1)
  root.right=createTree(arr,mid+1,right)
  return root

}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }

  const arr = [-10,-3,0,5,9];
const root = sortedArrayToBST(arr);
console.log(root);





function createTree(arr,start,end){
  if (start > end) {
  return null;
}
const mid = Math.floor((start + end) / 2);
const root = new TreeNode(arr[mid]);
root.left = createTree(arr, start, mid - 1);
root.right = createTree(arr, mid + 1, end);
return root;

}








function createTree(arr,left,right){
  if(left>right){
      return null
  }

  const mid=Math.floor((right-left)/2);
  console.log('check here ',left,right,mid )
  const root=new TreeNode(arr[mid])
  root.left=createTree(arr,left,mid-1)
  root.right=createTree(arr,mid+1,right)
  return root

}