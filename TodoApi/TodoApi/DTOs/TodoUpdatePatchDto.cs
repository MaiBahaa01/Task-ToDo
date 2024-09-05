namespace TodoApi.DTOs
{
    public class TodoUpdatePatchDto
    {
        public string Title { get; set; }
        public bool? Completed { get; set; }
    }
}
