package com.campusfix;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*") // For demo only; restrict to your frontend domain in production.
public class ComplaintController {
    private final ComplaintRepository repository;
    public ComplaintController(ComplaintRepository repository){this.repository=repository;}
    @GetMapping public List<Complaint> all(){return repository.findAll();}
    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public Complaint create(@Valid @RequestBody Complaint complaint){
        complaint.setId(null); complaint.setStatus("SUBMITTED"); return repository.save(complaint);
    }
    @PatchMapping("/{id}/status")
    public Complaint updateStatus(@PathVariable Long id, @RequestBody StatusUpdate update){
        Complaint c=repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Complaint not found"));
        if(!List.of("SUBMITTED","IN_PROGRESS","RESOLVED","REJECTED").contains(update.status()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid status");
        c.setStatus(update.status()); return repository.save(c);
    }
    public record StatusUpdate(String status){}
}