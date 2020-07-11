const favoriteBlog = require("../utils/list_helper").favoriteBlog

const listWithOneBlog = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
  }
]

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    likes: 2,
  },
]


describe("favorite blog", () => {

  test("of empty list is zero", () => {
    expect(favoriteBlog([])).toBe(0)    // wut to be
  })

  test("when list has only one blog equals that blog itself", () => {
    const ans = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5
      }
    ]
    expect(favoriteBlog(listWithOneBlog)).toEqual(ans[0])     //bug fix: ans[0]
  })

  test("of a bigger list is calculated right", () => {
    const ans = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    ]
    expect(favoriteBlog(blogs)).toEqual(ans[0])
  })
})
